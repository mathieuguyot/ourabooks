import { Component, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import Map from "ol/Map";
import View from "ol/View";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import Feature from "ol/Feature";
import { LineString } from "ol/geom";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";

@Component({
    selector: "app-map",
    standalone: true,
    imports: [],
    templateUrl: "./map.component.html",
    styleUrl: "./map.component.scss"
})
export class MapComponent {
    public map!: Map;
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.map = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM()
                    })
                ],
                target: "map",
                view: new View({
                    center: [0, 0],
                    zoom: 4,
                    maxZoom: 18
                })
            });
            this.loadGPXFile("/assets/Canal_du_midi_chill.gpx");
        }
    }

    loadGPXFile(filePath: string) {
        fetch(filePath)
            .then((response) => response.text())
            .then((gpxData) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(gpxData, "text/xml");

                const trackCoords: number[][] = [];
                const trackPoints = xmlDoc.querySelectorAll("trkpt");
                trackPoints.forEach((point) => {
                    const lon = point.getAttribute("lon");
                    const lat = point.getAttribute("lat");
                    if (lon && lat) {
                        trackCoords.push([parseFloat(lon), parseFloat(lat)]);
                    }
                });

                const trackFeature = new Feature({
                    geometry: new LineString(trackCoords).transform("EPSG:4326", "EPSG:3857")
                });

                const vectorSource = new VectorSource({
                    features: [trackFeature]
                });

                const vectorLayer = new VectorLayer({
                    source: vectorSource
                }) as any;

                this.map.addLayer(vectorLayer);

                // Fit the map to the extent of the GPX track
                this.map.getView().fit((trackFeature.getGeometry() as any).getExtent(), {
                    padding: [20, 20, 20, 20],
                    maxZoom: 16
                });
            })
            .catch((error) => {
                console.error("Error loading GPX file:", error);
            });
    }
}
