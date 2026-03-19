import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-wedding-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wedding-landing.component.html',
  styleUrls: ['./wedding-landing.component.css']
})
export class WeddingLandingComponent implements OnInit, OnDestroy, AfterViewChecked {
  
  @ViewChild('videoPlayer', { static: false }) videoPlayer?: ElementRef<HTMLVideoElement>;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  galeria1 = [
    { src: 'assets/images/wedding/tomandoalgo.jpg', alt: 'Conocimos bailando' },
    { src: 'assets/images/wedding/citarestaurante.jpg', alt: 'Restaurante donde nos conocimos' }
  ];
  
  galeria2 = [
    { src: 'assets/images/wedding/parcela.jpg', alt: 'Parcela antes de la boda', type: 'image' },
    { src: 'assets/images/wedding/techo.jpg', alt: 'techo', type: 'image' },
    { src: 'assets/images/wedding/nevada.jpg', alt: 'nevada', type: 'image' },
    { src: 'assets/videos/wedding/vueloparcela.mp4', alt: 'vuelo parcela', type: 'video' }
  ];
  
  galeria3 = [
    { src: 'assets/images/wedding/Marraketchs_.jpg', alt: 'Marrakech' },
    { src: 'assets/images/wedding/rumayey.jpg', alt: 'Rumania' }
  ];
  
  currentIndex1 = 0;
  currentIndex2 = 0;
  currentIndex3 = 0;
  
  private intervalId1: any;
  private intervalId2: any;
  private intervalId3: any;

  ngOnInit() {
    // Solo ejecutar intervalos en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      // Rotar cada galería cada 3 segundos
      this.intervalId1 = setInterval(() => {
        this.currentIndex1 = (this.currentIndex1 + 1) % this.galeria1.length;
      }, 3000);
      
      // Galería 2 con lógica especial para video
      this.startGallery2Rotation();
      
      this.intervalId3 = setInterval(() => {
        this.currentIndex3 = (this.currentIndex3 + 1) % this.galeria3.length;
      }, 3000);
    }
  }
  
  startGallery2Rotation() {
    this.intervalId2 = setInterval(() => {
      const nextIndex = (this.currentIndex2 + 1) % this.galeria2.length;
      
      // Si el siguiente item es un video, detener el intervalo
      if (this.galeria2[nextIndex].type === 'video') {
        clearInterval(this.intervalId2);
      }
      
      this.currentIndex2 = nextIndex;
    }, 3000);
  }
  
  onVideoEnded() {
    // Cuando el video termine, avanzar a la siguiente imagen y reiniciar rotación
    this.currentIndex2 = (this.currentIndex2 + 1) % this.galeria2.length;
    // Reiniciar el intervalo para continuar la rotación automática
    if (isPlatformBrowser(this.platformId)) {
      this.startGallery2Rotation();
    }
  }
  
  onVideoLoaded(event: Event) {
    // Cuando el video esté cargado, configurar tiempo inicial y reproducir
    if (isPlatformBrowser(this.platformId)) {
      const video = event.target as HTMLVideoElement;
      // Pequeño timeout para asegurar que el video esté completamente listo
      setTimeout(() => {
        video.currentTime = 4;
        video.play().catch(err => console.log('Error playing video:', err));
      }, 100);
    }
  }
  
  ngAfterViewChecked() {
    // Ya no necesitamos lógica aquí, se maneja con el evento (loadeddata)
  }

  ngOnDestroy() {
    // Limpiar intervalos al destruir el componente
    if (this.intervalId1) clearInterval(this.intervalId1);
    if (this.intervalId2) clearInterval(this.intervalId2);
    if (this.intervalId3) clearInterval(this.intervalId3);
  }
  
  nextImage(galeria: number) {
    if (galeria === 1) this.currentIndex1 = (this.currentIndex1 + 1) % this.galeria1.length;
    if (galeria === 2) this.currentIndex2 = (this.currentIndex2 + 1) % this.galeria2.length;
    if (galeria === 3) this.currentIndex3 = (this.currentIndex3 + 1) % this.galeria3.length;
  }
  
  prevImage(galeria: number) {
    if (galeria === 1) this.currentIndex1 = (this.currentIndex1 - 1 + this.galeria1.length) % this.galeria1.length;
    if (galeria === 2) this.currentIndex2 = (this.currentIndex2 - 1 + this.galeria2.length) % this.galeria2.length;
    if (galeria === 3) this.currentIndex3 = (this.currentIndex3 - 1 + this.galeria3.length) % this.galeria3.length;
  }
}
