/*
	Urban by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

const linkDescription = document.querySelector('.myContactInfo');
const container = document.querySelector('body');
const contactContainer = document.getElementById('contact-form');

container.addEventListener('mouseover', e => {
	if (e.target.classList.contains('fa-youtube')) { linkDescription.innerHTML = 'YouTube playlist of my capstone projects'; linkDescription.style.opacity = '1' }
	else if (e.target.classList.contains('fa-github')) { linkDescription.innerHTML = 'my GitHub overview'; linkDescription.style.opacity = '1' }
	else if (e.target.classList.contains('fa-file')) { linkDescription.innerHTML = 'view & download my resume'; linkDescription.style.opacity = '1' }
	else if (e.target.classList.contains('fa-linkedin')) { linkDescription.innerHTML = 'my LinkedIn profile'; linkDescription.style.opacity = '1' }
	else if (e.target.classList.contains('fa-envelope')) { linkDescription.innerHTML = 'send me an email'; linkDescription.style.opacity = '1' }
	else if (e.target.classList.contains('fa-mobile')) { linkDescription.innerHTML = 'give me a call | 615.578.9200'; linkDescription.style.opacity = '1' }
});

container.addEventListener('mouseout', e => {
	if (e.target.classList.contains('icon')) {
		linkDescription.innerHTML = ''; linkDescription.style.opacity = '0'
	};
});

contactContainer.addEventListener('submit', e => {
	e.preventDefault();
	// build the message parameters object
	const messageParams = {
		from_email: document.getElementById('email').value,
		from_name: document.getElementById('name').value,
		message_category: document.getElementById('category').value,
		message_body: document.getElementById('message').value,
		contact_number: Math.random() * 100000 | 0
	};
	// get message priority
	if (document.getElementById('priority-low').checked == true) {
		messageParams.message_priority = "Low";
	} else if (document.getElementById('priority-normal').checked == true) {
		messageParams.message_priority = "Normal";
	} else if (document.getElementById('priority-high').checked == true) {
		messageParams.message_priority = "High";
	};
	// build function to send the form
	const sendForm = () => {
		emailjs.send('keartroth_contact_service', 'personal_site_contact_form', messageParams)
			.then((response) => {
				console.log('SUCCESS!', response.status, response.text)
			}, (error) => {
				console.log('FAILED...', error)
			});
	};
	// send the form with or without a copy to the user
	if (document.getElementById('copy').checked == true) {
		messageParams.optional_cc = messageParams.from_email;
		sendForm();
		document.getElementById('contact-form').reset();
	} else {
		sendForm();
		document.getElementById('contact-form').reset();
	};
});

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

		// Header.
		if (skel.vars.IEVersion < 9)
			$header.removeClass('alt');

		if ($banner.length > 0
			&& $header.hasClass('alt')) {

			$window.on('resize', function () { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom: $header.outerHeight(),
				terminate: function () { $header.removeClass('alt'); },
				enter: function () { $header.addClass('alt'); },
				leave: function () { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}

		// Banner.
		var $banner = $('#banner');

		if ($banner.length > 0) {

			// IE fix.
			if (skel.vars.IEVersion < 12) {

				$window.on('resize', function () {

					var wh = $window.height() * 0.60,
						bh = $banner.height();

					$banner.css('height', 'auto');

					window.setTimeout(function () {

						if (bh < wh)
							$banner.css('height', wh + 'px');

					}, 0);

				});

				$window.on('load', function () {
					$window.triggerHandler('resize');
				});

			}

			// Video check.
			var video = $banner.data('video');

			if (video)
				$window.on('load.banner', function () {

					// Disable banner load event (so it doesn't fire again).
					$window.off('load.banner');

					// Append video if supported.
					if (!skel.vars.mobile
						&& !skel.breakpoint('large').active
						&& skel.vars.IEVersion > 9)
						$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

				});

			// More button.
			$banner.find('.more')
				.addClass('scrolly');

		}

		// Tabs.
		$('.flex-tabs').each(function () {

			var t = jQuery(this),
				tab = t.find('.tab-list li a'),
				tabs = t.find('.tab');

			tab.click(function (e) {

				var x = jQuery(this),
					y = x.data('tab');

				// Set Classes on Tabs
				tab.removeClass('active');
				x.addClass('active');

				// Show/Hide Tab Content
				tabs.removeClass('active');
				t.find('.' + y).addClass('active');

				e.preventDefault();

			});

		});

		// Scrolly.
		$('.scrolly').scrolly({
			offset: function () {
				return $header.height() - 2;
			}
		});

	});

})(jQuery);