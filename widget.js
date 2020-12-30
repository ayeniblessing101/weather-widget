(function (window, undefined) {
  function getLocation() {
    var scripts = document.getElementsByTagName("script");

    var location;
    location = scripts[1].getAttribute("data-location");

    if (location) {
      return location;
    }
    return "Lagos";
  }

  function makeRequest(url, method) {
    xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      xhr = null;
    }
    return xhr;
  }

  function loadScript(url) {
    var scriptTag = document.createElement("script");
    scriptTag.src = url;

    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(scriptTag, entry);
  }

  function loadStylesheet(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;

    var entry = document.getElementsByTagName("script")[0];
    entry.parentNode.insertBefore(link, entry);
  }

  function displayWidgetData(data) {
    var html =
      "<div id='weather-widget-container'>" +
      "<h3>" +
      data.location.name +
      "</h3>" +
      '<img  src="' +
      data.current.weather_icons[0] +
      '"  />' +
      "<p>" +
      data.current.temperature +
      "&deg;C - " +
      data.current.weather_descriptions +
      " </p>" +
      "</div>";

    var div = document.createElement("div");
    div.innerHTML = html;

    var appendTo = document.getElementById("weather-widget");
    appendTo.parentNode.insertBefore(div, appendTo);
  }

  function loadSupportingFiles() {
    loadStylesheet("http://localhost:5501/stylesheet.css");
    var param = getLocation();

    var xhttp = makeRequest(
      "http://api.weatherstack.com/current?access_key=ab8f7fac1de861ca98642b901ad8fbc1&query=" +
        param,
      "GET"
    );

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        displayWidgetData(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.send();
  }

  loadSupportingFiles();
})(window);
