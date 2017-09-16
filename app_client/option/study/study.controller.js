angular
	.module('locator_app')
	.controller('studyCtrl', studyCtrl);

	function studyCtrl ($scope) {
		$scope.data = {
				locations: [{
				name: 'Burger Queen',
				address: '125 High Street, Reading, RG6 1PS',
				rating: 3,
				image: '/images/study.jpg',
				facilities: ['Hot drinks', 'Food', 'Premium wifi'],
				distance: '0.296456',
				_id: '5370a35f2536f6785f8dfb6a'
			},{
				name: 'Costy',
				address: '125 High Street, Reading, RG6 1PS',
				rating: 5,
				image: '/images/study.jpg',
				facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
				distance: '0.7865456',
				_id: '5370a35f2536f6785f8dfb6a'
			},{
				name: 'UET',
				address: '125 High Street, Reading, RG6 1PS',
				rating: 5,
				image: '/images/study.jpg',
				facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
				distance: '0.7865456',
				_id: '5370a35f2536f6785f8dfb6a'
			},{
					name: 'Costy',
					address: '125 High Street, Reading, RG6 1PS',
					rating: 5,
					image: '/images/study.jpg',
					facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
					distance: '0.7865456',
					_id: '5370a35f2536f6785f8dfb6a'
				},{
					name: 'UET',
					address: '125 High Street, Reading, RG6 1PS',
					rating: 5,
					image: '/images/study.jpg',
					facilities: ['Hot drinks', 'Food', 'Alcoholic drinks'],
					distance: '0.7865456',
					_id: '5370a35f2536f6785f8dfb6a'
				}
		]};
	}