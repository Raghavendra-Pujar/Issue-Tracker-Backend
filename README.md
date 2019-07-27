
Project Description
This project should be a ready to deploy, Issue Tracking Tool. It must have all the
features mentioned below and it must be deployed on a server before submission.
You are allowed to use any kind of modules, libraries and tool you want.
Features of the platform-
1. Login View
2. Personalized Dashboard View
3. Issue description view
4. Search view


1. Login View
1. User should be able to login to the system through his username/password
or social logins.
2. User should be able to register also.
3. Upon login, user should land on his Personalized Dashboard View.

2. Personalized Dashboard View
A table showing all issues currently assigned to logged-in user. It should have
following columns.
1. Status : current status of the issue. It can be in backlog, in- progress,
in-test, done.
2. Title: Title of the bug.
3. Reporter: User who reported the bug
4. Date: Date when this bug was reported.
5. A search box where, User should be able to search for an issue, which
would open Search View.
6. A create button: To log a new issue. On clicking, user should be
taken to issue description view.

NOTE:
1. Table should be paginated
2. Table should have sorting on columns
3. User should be able to filter rows based on any columns.
4. Upon clicking on any row, it’s Issue Description View, should open.


3. Issue description view:
1. Here user(Reporter) should be able to add/edit title of issue, Description of
issue, add/edit any related attachments, like screenshots. Description Box
should be a rich text editor having options like font styling, underline etc.
You may use any open source library for this.
2. Any user, including reporter and assignee, should be able to assign this
issue, to any another user (called assignee, hereafter). Any user should be
able to make changes to this issue.
3. Also, there should be a comments section, where any user, should be
able to make comments around this issue.
4. Further, Any user should be able to add himself, as watcher, to this issue. A
button called "Watch" should be there, for this. List of watchers should also
show. All watchers, assignee and reporter, should receive notifications, for
any changes or comments on this issue.
5. Notification should come on screen, having a short description of what
changed, Also, when clicked on notification, user should land on the Issue
Description View of related issue.


4. Search view
1. User should be able to search for any text.
2. User should be shown a results table, having all the issues related to the
search text.
3. This table will be similar to the table in Personalized Dashboard View.
