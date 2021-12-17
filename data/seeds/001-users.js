exports.seed = function(knex, Promise) {
    return knex('users')
      .truncate()
      .then(function() {
        return knex('users').insert([
          { username: 'Colby', password: '1234'},
          { username: 'Pacer', password: 'abcd'},
          { username: 'Ovidiu', password: 'ab12'},
          { username: 'Logan', password: '12ab'},
        ]);
      });
  }; 