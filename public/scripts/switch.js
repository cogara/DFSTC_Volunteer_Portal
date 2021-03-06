angular.module("uiSwitch", []).directive("switch", function() {
  return {
    restrict: "AE",
    replace: !0,
    transclude: !0,
    template: function(n, e) {
      var s = "";
      return s += "<span", s += ' class="switch' + (e.class ? " " + e.class : "") + '"', s += e.ngModel ? ' ng-click="' + e.ngModel + "=!" + e.ngModel + (e.ngChange ? "; " + e.ngChange + '()"' : '"') : "", s += ' ng-class="{ checked:' + e.ngModel + ' }"', s += ">", s += "<small></small>", s += '<input type="checkbox"', s += e.id ? ' id="' + e.id + '"' : "", s += e.name ? ' name="' + e.name + '"' : "", s += e.ngModel ? ' ng-model="' + e.ngModel + '"' : "", s += ' style="display:none" />', s += '<span class="switch-text">', s += e.on ? '<span class="on">' + e.on + "</span>" : "", s += e.off ? '<span class="off">' + e.off + "</span>" : " ", s += "</span>"
    }
  }
});
