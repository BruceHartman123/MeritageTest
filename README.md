This is a basic Calorie/meal tracker created in Angular 4.

Everything is stored in memory, so no changes will be saved between browser refreshes.

I didn't give the ability to create an admin user.  The admin user and pw = user1 / user1.
I created a normal user and pw = user2 / user2.

 The requirements for the project were:
-------------------------------------------------------------------------------------
Write an Angular v4 web application for tracking the input of meals and calories.
User Interface Requirements:
- Users must be able to create accounts and log in.
- When users log in, they see a list of their meals and calories
- Support Add, Edit, and Delete
- Each meal record has a Date, Time, Description, and Calories
- Users enter calories manually for each meal
- Support filter meals by date from and to, time from and to
E.g. support seeing how many calories eaten in the morning this week (between 7 and 10 am)
- Implement at least two roles with different permission levels
- Regular users can only CRUD their own records
- User managers can CRUD regular users
- Admin can CRUD all records and users
- Support a user setting for target number of calories per day
When set, the total number of calories for a given day will show in Red if over the target and in Green if within the target.
-----------------------------------------------------------------------------------------
