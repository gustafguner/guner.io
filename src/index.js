const css = require('./style.scss');
import anime from 'animejs'

var timeline = anime.timeline();

timeline
  .add({
    targets: '#landing #headline',
		easing: 'easeOutExpo',
		opacity: 0,
		scale: 0
  })
  .add({
    targets: '#landing #headline',
    scale: 1,
		easing: 'easeOutExpo',
		delay: 100,
		opacity: 1,
		begin: function() {
			var headline = document.getElementById('landing');
      animateParticules(headline.offsetLeft + (headline.offsetWidth/2), headline.offsetTop + (headline.offsetHeight/2));
		}
	})
	.add({
		targets: ['#landing .text'],
    opacity: 1,
    duration: 600
  })
  .add({
    targets: ['section#bio', 'section#selected-work', 'section#skills'],
    opacity: 1,
    duration: 800,
    offset: '-=500'
  })
  .add({
    targets: ['#site-header #site-logo'],
    opacity: 1,
    offset: '-=600'
  });

// Heavily inspired from: https://codepen.io/juliangarnier/pen/gmOwJX
// © Julian Garnier

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var colors = ['#EA2027', '#FFC312', '#0037FF', '#FDA7DF'];

function setCanvasSize() {
	canvasEl.width = window.innerWidth * 2;
	canvasEl.height = window.innerHeight * 2;
	canvasEl.style.width = window.innerWidth + 'px';
	canvasEl.style.height = window.innerHeight + 'px';
	canvasEl.getContext('2d').scale(2, 2);
}

function setParticuleDirection(p) {
	var angle = anime.random(0, 90) * Math.PI / 180;
	var value = anime.random(250, 500);
	var radius = [-1, 1][anime.random(0, 1)] * value;
	return {
		x: p.x + radius * Math.cos(angle),
		y: p.y + radius * Math.sin(angle)
	}
}

function createParticule(x,y) {
	var p = {x: x, y: y};
	p.color = colors[anime.random(0, colors.length - 1)];
	p.radius = anime.random(50, 150);
	p.endPos = setParticuleDirection(p);
	p.draw = function() {
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
		ctx.fillStyle = p.color;
		ctx.fill();
	}
	return p;
}

function renderParticule(anim) {
	for (var i = 0; i < anim.animatables.length; i++) {
		anim.animatables[i].target.draw();
	}
}

function animateParticules(x, y) {
	var particules = [];
	for (var i = 0; i < numberOfParticules; i++) {
		particules.push(createParticule(x, y));
	}
	anime.timeline().add({
		targets: particules,
		x: function(p) { return p.endPos.x; },
		y: function(p) { return p.endPos.y; },
		radius: 0.1,
		duration: anime.random(1500, 2000),
		easing: 'easeOutExpo',
		update: renderParticule
	});
}

var render = anime({
	duration: Infinity,
	update: function() {
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	}
});


var centerX = window.outerWidth / 2;
var centerY = window.outerHeight / 2;

setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);