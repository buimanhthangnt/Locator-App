angular.module('locator_app').controller('addLocationCtrl', addLocationCtrl);

function addLocationCtrl($http) {
	let vm = this;
	vm.openingTimes = [];
	vm.pushDefaultOpeningTime = () => {
		vm.openingTimes.push({
			day: null,
			state: false,
			open: null,
			close: null
		});
	}
	vm.onSubmit = () => {
		let form = vm.formData;
		if (!form || !form.name || !form.type || !form.address || !form.rating || !form.longitude
			|| !form.latitude || !form.discount || vm.openingTimes.length == 0) {
			alert('All fields are required!');
			return;
		}
		let keywords = [];
		if (vm.formData.checkboxFood) keywords.push('Food');
		if (vm.formData.checkboxSilence) keywords.push('Silence');
		if (vm.formData.checkboxWifi) keywords.push('Premium Wifi');
		if (vm.formData.checkboxOutdoor) keywords.push('Outdoor');
		if (vm.formData.checkboxDrink) keywords.push('Drinks');
		if (vm.formData.checkboxGaming) keywords.push('Gaming Room');
		if (vm.formData.checkboxOvernight) keywords.push('Overnight');
		if (vm.formData.checkboxPower) keywords.push('Power');
		if (keywords.length == 0) {
			alert('Please choose at least one keyword');
			return;
		}
		let isFilled = true;
		vm.openingTimes.forEach((ot) => {
			if (ot['state'] == true) {
				for (let prop in ot) {
					if (ot[prop] == null) isFilled = false;
				}
			} else {
				if (!ot['day']) isFilled = false;
				else {
					ot['close'] = "";
					ot['open'] = "";
				}
			}
		});
		if (!isFilled) {
			alert('All fields are required!');
			return;
		}
		$http.post('/api/locations/addlocation', {
			name: form.name,
			type: form.type,
			keywords: keywords,
			address: form.address,
			rating: form.rating,
			longitude: form.longitude,
			latitude: form.latitude,
			discount: form.discount,
			openingTimes: vm.openingTimes
		}).then((res) => {
			alert(res.data.msg);
		}, (err) => {
			throw new Error(err);
		})
	}
}
