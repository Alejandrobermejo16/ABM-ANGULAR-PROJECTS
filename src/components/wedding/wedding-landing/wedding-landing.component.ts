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
    { src: 'assets/images/wedding/tomando_algo.jpg', alt: 'Tomando algo', type: 'image' },
    { src: 'assets/images/wedding/restaurantecena.jpg', alt: 'Restaurante', type: 'image' }
  ];
  
  galeria2 = [
    { src: 'assets/images/wedding/parcela_antes_.jpg', alt: 'Parcela antes de la boda', type: 'image' },
    { src: 'assets/images/wedding/techito.jpg', alt: 'techo', type: 'image' },
    { src: 'assets/images/wedding/nevadita.jpg', alt: 'nevada', type: 'image' },
    { src: 'assets/videos/wedding/vueloparcela.mp4', alt: 'vuelo parcela', type: 'video' }
  ];
  
  galeria3 = [
    { src: 'assets/images/wedding/marruecos_.jpg', alt: 'Marrakech', type: 'image' },
    { src: 'assets/images/wedding/rumania_.jpg', alt: 'Rumania', type: 'image' }
  ];
  
  currentIndex1 = 0;
  currentIndex2 = 0;
  currentIndex3 = 0;
  
  private intervalId1: any;
  private intervalId2: any;
  private intervalId3: any;
  videoPlayed = false;

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
      
      // Si el siguiente item es un video, detener el intervalo y resetear bandera
      if (this.galeria2[nextIndex].type === 'video') {
        clearInterval(this.intervalId2);
        this.videoPlayed = false; // Resetear para permitir reproducción
      }
      
      this.currentIndex2 = nextIndex;
    }, 3000);
  }
  
  onVideoEnded() {
    // Cuando el video termine, avanzar a la siguiente imagen y reiniciar rotación
    this.videoPlayed = false;
    this.currentIndex2 = (this.currentIndex2 + 1) % this.galeria2.length;
    // Reiniciar el intervalo para continuar la rotación automática
    if (isPlatformBrowser(this.platformId)) {
      this.startGallery2Rotation();
    }
  }
  
  ngAfterViewChecked() {
    // No hacer nada aquí, dejar que los eventos del video manejen la reproducción
  }
  
  onVideoLoaded(event: Event) {
    // Evento loadeddata - reproducir cuando hay datos
    if (isPlatformBrowser(this.platformId) && !this.videoPlayed) {
      this.videoPlayed = true;
      const video = event.target as HTMLVideoElement;
      video.currentTime = 4;
      video.play().catch(err => console.log('Error on loadeddata:', err));
    }
  }
  
  onVideoCanPlay(event: Event) {
    // Evento canplay - reproducir cuando puede reproducirse
    if (isPlatformBrowser(this.platformId) && !this.videoPlayed) {
      this.videoPlayed = true;
      const video = event.target as HTMLVideoElement;
      video.currentTime = 4;
      video.play().catch(err => console.log('Error on canplay:', err));
    }
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
