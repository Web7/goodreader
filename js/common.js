(function(){
	window.gr = {};

	$.fn.exists = function () {
		return this.length !== 0;
	};

	$.fn.scrollToTop = function () {
		$(this).removeAttr('href').on('click', function () {
			$('html, body').animate({scrollTop: 0}, 'slow');
		})
	};

	var classNames = {
		navbarNav: 'navbar-nav',
		textRight: 'text-right',

		grUserManualMenu: 'gr-user-manual-menu',
		grManualMenu: 'gr-manual-menu',

		btnScrollTo: 'btn-scroll-to',

		grFooter: 'gr-footer',

		grDefault: 'gr-default',
		grFixed: 'gr-fixed',
		grPositionFooter: 'gr-position-footer',
		grStopFind: 'gr-stop-find',

		grShowShortText: 'gr-show-short-text',
		grShowFullText: 'gr-show-full-text',
		grTextHeight: 'gr-text-height',
		grShowFullTextButton: 'gr-show-full-text-button',

		grMobileMenu: 'gr-mobile-menu',
		grOpenMenu: 'gr-open-menu'
	};
	var ids = {};

	var buildSelectors = function (selectors, source, characterToPrependWith) {
		$.each(source, function (propertyName, value) {
			selectors[propertyName] = characterToPrependWith + value;
		});
	};

	gr.buildSelectors = function (classNames, ids) {
		var selectors = {};
		if (classNames) {
			buildSelectors(selectors, classNames, ".");
		}
		if (ids) {
			buildSelectors(selectors, ids, "#");
		}
		return selectors;
	};

	var selectors = gr.buildSelectors(classNames, ids);

	var $grUserManualMenu,
		$grFooter,
		$btnScrollTo,
		$grShowShortText,
		$grTextHeight,
		$grMobileMenu,
		$body,
		$navbarNav,
		posGrUserManualMenu,

		isShowMenu = false;

	$(function(){
		$grUserManualMenu = $(selectors.grUserManualMenu);
		$btnScrollTo = $(selectors.btnScrollTo);
		$grFooter = $(selectors.grFooter);
		$grShowShortText = $(selectors.grShowShortText);
		$grTextHeight = $(selectors.grTextHeight);
		$grMobileMenu = $(selectors.grMobileMenu);
		$navbarNav = $(selectors.navbarNav);
		$body = $('body');

		if ($grUserManualMenu.exists()) {
			posGrUserManualMenu = $grUserManualMenu.offset();
		}

		if ($btnScrollTo.exists()) {
			$btnScrollTo.each(function(){
				this.onclick = function() {
					return false;
				};
			});
			$btnScrollTo.scrollToTop();
		}

		$grMobileMenu.on('click', function(){
			if ($body.hasClass(classNames.grOpenMenu)) {
				$navbarNav.slideUp(function(){
					$body.toggleClass(classNames.grOpenMenu);
				});
			} else {
				$body.toggleClass(classNames.grOpenMenu);
				$navbarNav.slideDown();
			}
		});

		gr.renderShowShortText();
	});

	$(document).on('scroll', function(){
		if ($grUserManualMenu.exists()) {
			var $this = $(this),
				containerMenuHeight = $grUserManualMenu.find(selectors.grStopFind).height(),
				thisScrollTop = $this.scrollTop();
			if (($(document).height() - containerMenuHeight) <= (thisScrollTop + 489)) {
				$grUserManualMenu.addClass(classNames.grPositionFooter);
			} else {
				$grUserManualMenu.removeClass(classNames.grPositionFooter);
				if (thisScrollTop >= 79 && $grUserManualMenu.hasClass(classNames.grDefault)) {
					var widthManualMenu = $grUserManualMenu.closest(selectors.grManualMenu).width();
					$grUserManualMenu.removeClass(classNames.grDefault).addClass(classNames.grFixed).css({width: widthManualMenu});
				}
				if (thisScrollTop <= 79 && $grUserManualMenu.hasClass(classNames.grFixed)) {
					$grUserManualMenu.removeClass(classNames.grFixed).addClass(classNames.grDefault).removeAttr('style');
				}
			}

		}
	});

	$(window).on('resize', function(){
		gr.renderShowShortText();
		if ($(this).width() > 940) {
			$body.removeClass(classNames.grOpenMenu);
			$navbarNav.removeAttr('style');
		}
	});

	gr.renderShowShortText = function() {
		if ($grShowShortText.exists()) {
			$(selectors.grShowFullTextButton).remove();
			$grShowShortText.each(function(){
				var $this = $(this);
				var $grShowFullTextButton;
				var fullHeight = $this.find(selectors.grTextHeight).height();
				$this.removeClass(classNames.grShowFullText).removeAttr('style');
				if (fullHeight > 125) {
					$grShowFullTextButton = $('<p/>', {class: classNames.textRight + ' ' + classNames.grShowFullTextButton}).html($('<a/>', {
						href: '#',
						text: '...More'
					}));
					$grShowFullTextButton.insertAfter($this);
					$grShowFullTextButton.on('click', function (e) {
						var _$this = $(this);
						e.preventDefault();
						if (!$this.hasClass(classNames.grShowFullText)) {
							$this.animate({height: fullHeight}, 400).addClass(classNames.grShowFullText);
							_$this.find('a').text('Hide');
						} else {
							$this.animate({height: 125}, 400).removeClass(classNames.grShowFullText);
							_$this.find('a').text('...More');
						}
						return false;
					});
				} else {
					$this.addClass(classNames.grShowFullText);
				}
			});
		}
	};
})();