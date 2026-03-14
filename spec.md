# Alumni Association Website

## Current State
The app has a full alumni portal with Internet Identity login, user profiles (with email field), alumni directory, events, jobs, forum, and admin controls. Authorization uses a role system (admin/user/guest).

## Requested Changes (Diff)

### Add
- Auto-grant admin/director role to the user with email `stephenkasapogu@gmail.com` when they save their profile.

### Modify
- `saveCallerUserProfile` in `main.mo`: after saving the profile, check if the email matches the director email and assign admin role.

### Remove
- Nothing.

## Implementation Plan
1. In `main.mo`, after `userProfiles.add(caller, profile)`, check if `profile.email == "stephenkasapogu@gmail.com"` and call `AccessControl.assignRole` to grant admin role.
