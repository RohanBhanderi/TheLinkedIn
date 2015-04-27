show databases;
use cmpe_282;

select * from userdetails;
select * from userauthenticate;

alter table userauthenticate modify COLUMN lastlogin DATETIME;
alter table userdetails add column dob varchar(25);
alter table userdetails modify column summary varchar(250);

select * from experience;
desc userdetails;