import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';


function insertLink(title, url) {
  Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (Links.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com'
    );
  }

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
