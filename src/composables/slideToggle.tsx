import { slideUp } from '@/composables/slideUp';
import { slideDown } from '@/composables/slideDown';

export function slideToggle(elm: HTMLElement, duration: number = 300) {
	if (window.getComputedStyle(elm).display === 'none') {
		slideDown(elm, duration);
	} else {
		slideUp(elm, duration);
	}
}
