$(document).ready(function () {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    function showPosition(position) { // init mapy
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        var center = SMap.Coords.fromWGS84(position.coords.longitude, position.coords.latitude);
        var m = new SMap(JAK.gel("m"), center, 15);
        m.addControl(new SMap.Control.Sync());
        m.addDefaultLayer(SMap.DEF_BASE).enable();
        var mouse = new SMap.Control.Mouse(SMap.MOUSE_PAN | SMap.MOUSE_WHEEL | SMap.MOUSE_ZOOM);
        m.addControl(mouse);

        var obrazek = "https://api.mapy.cz/img/api/marker/drop-red.png";

        var znacky = [];
        var souradnice = [];

        for (var i = 0; i < array.length; i++) {
            var c = SMap.Coords.fromWGS84(array[i][0]);

            var options = {
                url: obrazek,
                title: array[i][1],
                anchor: { left: 10, bottom: 1 }
            }

            var znacka = new SMap.Marker(c, null, options);
            var card = new SMap.Card();
            card.getBody().innerHTML = array[i][1];
            znacka.decorate(SMap.Marker.Feature.Card, card);
            souradnice.push(c);
            znacky.push(znacka);
        }

        var options = {
            anchor: { left: 0.5, top: 0.5 }
        }
        if (znacky.length > 0) {
            znacky[0].decorate(SMap.Marker.Feature.RelativeAnchor, options);
        }

        var vrstva = new SMap.Layer.Marker();
        m.addLayer(vrstva);
        vrstva.enable();
        for (var i = 0; i < znacky.length; i++) {
            vrstva.addMarker(znacky[i]);
        }
        var firstClick = false;
        var cordText = $("#cord");
        function click(e, elm) {      // interakce s mapou
            var coords = SMap.Coords.fromEvent(e.data.event, m);
            cordText.text(coords.toWGS84(2).reverse().join(""));
            var znacka = new SMap.Marker(coords, null, options);
            souradnice.push(c);
            if (firstClick)
                vrstva.removeMarker(znacky[znacky.length - 1]);
            else
                firstClick = true;
            vrstva.addMarker(znacka);
            znacky.push(znacka);

        }

        m.getSignals().addListener(window, "map-click", click);

        $("#btn").click(function () {    // uloží bod
            var postData = cordText.text();
            $.ajax({
                url: "addMarker.php",
                method: "POST",

                data: {
                    cord: postData,
                    text: $("#markText").val()
                },
                success: function (response) {
                    var c = SMap.Coords.fromWGS84(postData);
                    var options = {
                        url: obrazek,
                        title: "Test2",
                        anchor: { left: 10, bottom: 1 }
                    }

                    var znacka = new SMap.Marker(c, null, options);
                    var card = new SMap.Card();
                    card.getBody().innerHTML = postData;
                    znacka.decorate(SMap.Marker.Feature.Card, card);
                    vrstva.addMarker(znacka);
                    souradnice.push(c);
                    znacky.push(znacka);

                },
                error: function () {
                    alert("error");
                }

            });
        })

    }
});