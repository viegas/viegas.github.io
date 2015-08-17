$(window).load(function() {
				$(".cards").masonry({
						itemSelector: ".card",
						transitionDuration: 0
				})
		}),
		function(e) {
				"use strict";

				function t(e) {
						return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(e)
				}

				function a(e) {
						return e.length > 0
				}

				function s(e) {
						var s = e.parent(),
								n = e.val();
						if (n.length ? s.addClass("completed") : s.removeClass("completed"), e.is("[required]")) {
								var i = e.is('[type="email"]') ? t(n) : a(n);
								s.attr("data-isvalid", i)
						} else n.length ? s.attr("data-isvalid", "true") : s.removeAttr("data-isvalid")
				}
				var n, i = e("body"),
						o = e("header"),
						l = e(".hero"),
						r = e(".menu"),
						d = e(".top-bar").height(),
						m = e('nav [href^="#"]'),
						c = m.map(function() {
								return e(e(this).attr("href"))
						});
				e(window).scroll(function() {
						var t, a = e(this).scrollTop(),
								s = a + d + 50,
								r = window.matchMedia("(max-width:900px)"),
								u = c.map(function() {
										return e(this).offset().top < s ? this : void 0
								});
						u = u[u.length - 1], t = u && u.length ? "#" + u[0].id : m.first().attr("href"), n !== t && (n = t, m.removeClass("active"), e("[href=" + t + "]").addClass("active")), r.matches ? (o.removeClass("menuHidden"), i.toggleClass("collapsed", a >= 0), l.toggleClass("sticky", a > 133)) : (o.toggleClass("menuHidden", d > a), i.toggleClass("collapsed", a > d), l.toggleClass("sticky", a > 333))
				}).resize(function() {
						e(this).trigger("scroll")
				}).trigger("scroll"), r.on("click", function() {
						i.toggleClass("collapsed")
				}), e('[href^="#"]').on("click", function(t) {
						t.preventDefault(), e("html,body").animate({
								scrollTop: e(e(this).attr("href")).offset().top - d - 44
						}, 250)
				}), e("input,textarea").on("blur change input", function() {
						s(e(this))
				}), e("form.contact").on("submit", function(t) {
						t.preventDefault();
						var a = e(this),
								n = e("#submitform");
						return e(".message").removeClass("shown"), e.each(e("input,textarea"), function() {
								s(e(this))
						}), e('[data-isvalid="false"]').length ? (e("html,body").animate({
								scrollTop: e('[data-isvalid="false"]').first().offset().top - 150
						}, 250), !1) : (n.prop("disabled", !0), void e.ajax({
								method: "POST",
								url: "http://codrin.eu/utils/sendmail.php",
								data: {
										first_name: e("[name=first_name]").val(),
										last_name: e("[name=last_name]").val(),
										email: e("[name=email]").val(),
										company_name: e("[name=company_name]").val(),
										message: e("[name=message]").val()
								}
						}).done(function(t) {
								setTimeout(function() {
										n.prop("disabled", !1), 1 == t ? (a[0].reset(), e(".field").removeClass("completed").removeAttr("data-isvalid"), e(".message_success").addClass("shown")) : e(".message_error").addClass("shown")
								}, 2e3)
						}))
				})
		}(jQuery);
