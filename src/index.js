const css = require('./style.scss');
import anime from 'animejs'

var nameTimeline = anime.timeline();

nameTimeline
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
		opacity: 1
	})
	.add({
		targets: '#landing .text',
		opacity: 1
	})
	.add({
		targets: '#site-header #site-logo',
		opacity: 1
	});