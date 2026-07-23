import { AfterViewInit, Component, ElementRef, inject, ViewChild, PLATFORM_ID } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { landingService } from '../../services/landing.service/landing.service';
import { Game } from '../../features/game/game';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';

import { isPlatformBrowser } from '@angular/common';

interface EpisodeFacts {
  title: string;
  content: string;
}

@Component({
  selector: 'app-landing',
   standalone: true,
  imports: [Game, FormsModule],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss']
})

export class Landing implements AfterViewInit{
  [x: string]: any;
  private swapiService = inject(landingService);
  private router = inject(Router);

@ViewChild('universeCanvas', { static: false })
canvas?: ElementRef<HTMLCanvasElement>;

 facts: EpisodeFacts[] = [];
currentFact?: EpisodeFacts;

films = rxResource({
  stream: () => this.swapiService.getFilms()
});

  answer = '';
  movieName = '';

  answerError = '';
  movieError = '';

    constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.http
    .get<EpisodeFacts[]>('/assets/episodes.json')
    .subscribe(data => {
      this.facts = data;

      const randomIndex = Math.floor(Math.random() * data.length);
      this.currentFact = data[randomIndex];
    });
}

submitAnswer(): void {
  const answer = this.answer.trim().toLowerCase();

  if (!this.currentFact) {
    return;
  }

  const correctTitle = this.currentFact.title.trim().toLowerCase();

  if (answer === correctTitle) {
    this.answerError = '';
    this.answer = '';

 const slug = this.currentFact.title
  .toLowerCase()
  .replace(/\s+/g, '-');

this.router.navigate(['/episode', slug]);
``
  } else {
    this.answerError = 'Come on! You know it!!';
  }
}

  goToMovie(): void {
    const movie = this.movieName.trim().toLowerCase();
    const films = this.films.value() ?? [];

    const matchingFilm = films.find(
      (film: any) => film.title.toLowerCase() === movie
    );

    if (matchingFilm) {
      this.movieError = '';
      this.router.navigate(['/episode', movie]);
    } else {
      this.movieError =
        "This episode wasn't filmed yet. Are you from the future?";
    }
  }

private platformId = inject(PLATFORM_ID);

ngAfterViewInit(): void {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  this.createUniverse();
}
private createUniverse(): void {
  const canvas = this.canvas?.nativeElement;

  if (!canvas) {
    console.log('No canvas found');
    return;
  }

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    3000
  );

  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
  );

  renderer.setClearColor(0x000000, 1);

  // LIGHTING

  const ambientLight =
    new THREE.AmbientLight(
      0xffffff,
      0.15
    );

  scene.add(ambientLight);

  const sunLight =
    new THREE.DirectionalLight(
      0xffffff,
      5
    );

  sunLight.position.set(
    -25,
    15,
    25
  );

  scene.add(sunLight);

  // TEXTURES

  const loader =
    new THREE.TextureLoader();

  const colorMap =
    loader.load(
      'assets/textures/rocky_planet_color.jpg'
    );

  const normalMap =
    loader.load(
      'assets/textures/rocky_planet_normal.jpg'
    );

  const roughnessMap =
    loader.load(
      'assets/textures/rocky_planet_roughness.jpg'
    );

  // PLANET

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(
      4,
      256,
      256
    ),
    new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap,
      roughnessMap,
      roughness: 1,
      metalness: 0
    })
  );

  planet.rotation.z = 0.4;

  scene.add(planet);

  // ATMOSPHERE

  const atmosphere =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        4.1,
        128,
        128
      ),
      new THREE.MeshBasicMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
      })
    );

  scene.add(atmosphere);

  // MOON

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(
      0.8,
      64,
      64
    ),
    new THREE.MeshStandardMaterial({
      color: 0x888888,
      roughness: 1
    })
  );

  scene.add(moon);

  // STARS

  const starGeometry =
    new THREE.BufferGeometry();

  const starCount = 20000;

  const starPositions =
    new Float32Array(
      starCount * 3
    );

  for (
    let i = 0;
    i < starPositions.length;
    i++
  ) {
    starPositions[i] =
      (Math.random() - 0.5) *
      2500;
  }

  starGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      starPositions,
      3
    )
  );

  const stars =
    new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.9,
        sizeAttenuation: true
      })
    );

  scene.add(stars);

  // MOUSE PARALLAX

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener(
    'mousemove',
    (event) => {
      mouseX =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      mouseY =
        (event.clientY /
          window.innerHeight) *
          2 -
        1;
    }
  );

  // ANIMATION

  const animate = () => {
    requestAnimationFrame(
      animate
    );

    const orbitTime =
      Date.now() * 0.0003;

    // realistic rotation

    planet.rotation.y +=
      0.0012;

    atmosphere.rotation.y +=
      0.00125;

    // moon orbit

    moon.position.x =
      Math.cos(orbitTime) *
      8;

    moon.position.z =
      Math.sin(orbitTime) *
      8;

    moon.position.y =
      Math.sin(
        orbitTime * 1.3
      ) * 1.2;

    stars.rotation.y +=
      0.00001;

    // camera parallax

    camera.position.x +=
      (mouseX * 1.3 -
        camera.position.x) *
      0.02;

    camera.position.y +=
      (-mouseY * 1.3 -
        camera.position.y) *
      0.02;

    camera.lookAt(
      planet.position
    );

    renderer.render(
      scene,
      camera
    );
  };

  animate();

  // RESIZE

  window.addEventListener(
    'resize',
    () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    }
  );

  console.log(
    'Realistic rocky planet created'
  );
}

}
