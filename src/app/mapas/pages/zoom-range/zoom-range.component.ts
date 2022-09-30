import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }
    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number ] = [-75.62208355360754, 2.193330696656462];

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://1styles/mapbox/streets-v11',
      center: this.center, // style URL
      zoom: this.zoomLevel, // starting zoom
      });

      this.mapa.on('zoom', () => {
        this.zoomLevel = this.mapa.getZoom();
      })

      this.mapa.on('zoomend', () => {
        if ( this.mapa.getZoom() > 18) {
          this.mapa.zoomTo( 18 );
        }
      })

      //Movimiento del mapa
      this.mapa.on('move', (event) => {
        const target = event.target;
        const { lng, lat } = target.getCenter();
        this.center = [lng, lat];
      })
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo( Number(valor));
  }

}
