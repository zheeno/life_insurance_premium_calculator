import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Meteor.methods({
    calculatePremium: function (object) {
      // Premium is calculated by the following formula:

      // Premium = (insurance amount) X (ageFactor) X (genderFactor) X (smokeFactor)

      // ageFactor = userAge/60
      // genderFactor [Male = 0.0018, Female = 0.0013]
      // smokeFactor [ Smoker = 1.2, Non smoker = 0.9]

      const ageFactor = Number(object.age) / 60;
      var genderFactor = 0.0013, smokeFactor = 0.9;
      if (object.isMale) {
        genderFactor = 0.0018;
      }
      if (object.isSmoker) {
        smokeFactor = 1.2;
      }
      const premium = object.insuranceAmount * ageFactor * genderFactor * smokeFactor;
      return premium;
    },
  });
});
