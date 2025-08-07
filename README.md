# Overview

TIP: To get the project set up and navigate around, go Setup below.

NB: I created the repository in GitHub last week, but ran out of time to work on it then. I managed to find time today instead, and I've stayed within the 2 hour window.

To tick all of the boxes in 2 hours, plus having enough time for setup, I focused on the biggest bang-for-buck options which smoothed out the dev experience. All told, I:

-  Took the SQLite + Prisma route as suggested, which helped get off the ground quickly.
-  Set up a basic Prisma schema & migrated
-  Used server actions + Prisma to define basic CRUD operations quickly & easily.
-  Added some simple pages & server actions with validation
-  Also used cypress, since that can produce component tests quickly, which saved a lot of time.
-  I grabbed example config for things like tsconfig, eslint etc. from their docs.

I opted to colocate components, pages and tests. If components were being reused, I'd move them to a /components folder, but each was only used in 1 page so that wasn't necessary.
This is a challenging exercise to do in 2 hours, so the main way I saved time was by largely ignoring the appearance of the UI & focusing on functionality.

With more time, I would:

-  Write more meaningful tests. I included a basic component test for the single main component, and a very basic Jest test. In retrospect these are very similar. I ended up having to comment out some tests as I ran into a validation issue, but wanted to include them for visiblity of the approach.
-  Mocking Prisma & testing the logic of the server actions is important, but not something I could prioritise, and ran out of time for. Integration tests like these are crucial in my opinion.
-  Make a marginally less ugly UI - though ugly and functional is better than not functional at all!
-  Add a dynamic route per book to view details

The 3 acceptance criteria (listed below) are all included:

1. See a list of books (title, author, read?).
   Navigate to /
2. Add a new book.
   Try adding values for all of the form fields & click 'Create Book'
3. Toggle a book’s read status.
   Navigate to /myBooks, and check/uncheck the 'Mark as read' button

## Setup

install
`npm i`

generate prisma schema - required, because it outputs to node_modules, which is gitignored 
`npx prisma generate`

validate:
`tsc --noEmit`

## Run

dev:
    `npm run dev`

URLs:
- `localhost:3000/` - View all books and add new books  
- `localhost:3000/myBooks` - View user's books and toggle read status

database:
    `npx prisma studio`

## Testing

cypress:
`npx cypress run --component`

jest:
`npm run test`
