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
		grUserManualMenu: 'gr-user-manual-menu',
		grManualMenu: 'gr-manual-menu',

		btnScrollTo: 'btn-scroll-to',

		grFooter: 'gr-footer',

		grDefault: 'gr-default',
		grFixed: 'gr-fixed',
		grPositionFooter: 'gr-position-footer',
		grStopFind: 'gr-stop-find'
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
		posGrUserManualMenu;

	$(function(){
		$grUserManualMenu = $(selectors.grUserManualMenu);
		$btnScrollTo = $(selectors.btnScrollTo);
		$grFooter = $(selectors.grFooter);

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
	});

	$(document).on('scroll', function(){
		if ($grUserManualMenu.exists()) {
			var $this = $(this),
				containerMenuHeight = $grUserManualMenu.find(selectors.grStopFind).height() - 120,
				thisScrollTop = $this.scrollTop();

			if ((thisScrollTop - containerMenuHeight + $(window).height()) >= ($this.height() - 489)) {
				$grUserManualMenu.addClass(classNames.grPositionFooter);
			} else {
				$grUserManualMenu.removeClass(classNames.grPositionFooter);
				if (thisScrollTop >= 107 && $grUserManualMenu.hasClass(classNames.grDefault)) {
					var widthManualMenu = $grUserManualMenu.closest(selectors.grManualMenu).width();
					$grUserManualMenu.removeClass(classNames.grDefault).addClass(classNames.grFixed).css({width: widthManualMenu});
				}
				if (thisScrollTop <= 107 && $grUserManualMenu.hasClass(classNames.grFixed)) {
					$grUserManualMenu.removeClass(classNames.grFixed).addClass(classNames.grDefault).removeAttr('style');
				}
			}

		}

	});
})();