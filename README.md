# React Test

We have provided a simple React application with 2 pages:

- A “Posts” page that lists the titles of a user’s posts.
- A “User Details” page that displays some information about the active user.

We’ve used a publicly available [API](https://jsonplaceholder.typicode.com/).

Please add the following:

1. A dropdown in the top right corner of the application that allows us to select the active user.
2. The ability to click on a post in the “Posts” page and expand it to see the post body.
3. A search bar in the “Posts” page that matches the design specified [here](https://www.figma.com/design/4Lhm0Oj7EXsKzXvp7OIDEB/search-bar?node-id=0-1&t=GjAOQlc4I8XLUAQf-1).
4. Any single test that checks whether the search bar is working as expected.

We've used [Ant Design](https://ant.design/) for some of the components. You can use that or any other libraries you choose to complete the steps above.

To start the application run `npm install`, and then `npm start`.

We recommend spending about 2 hours on this task. If there is anything you missed or would have done differently given more time, feel free to comment what you would have done, or bring it up with us in the technical interview.

## Solution

The solutions for the tasks are in the following files:

To 1. Selecting user `UserDropdown` component in `src/modules/UserDropdown.tsx`

- to make this work I implemented a context with a hook to access the current user and change the user
- create a useFetch hook for better fetch handling, with abort of requests, loading and error states

To 2. Expandable `PostCard` component in `src/modules/Post.tsx`

- I could have used the `Collapse` component from `antd` but I decided to implement it myself

to 3. Pixel perfect implementation of `SearchInput` component in `src/modules/SearchInput/SearchInput.tsx`

- I used the `Input` component from `antd` and styled it with CSS

to 4. Tests for `PostsPage` component in `src/pages/PostsPage.tsx`

- I tested the PostsPage as it has the combination of search and posts, to validate that the search works. This required to mock UserContext, matchMedia for Antd components, and the fetch of posts. I could have written more tests but I decided to keep it simple.
- I installed a new library `@testing-library/react` to simplify the tests

Additionally, I refactored the `Page` component to `Layout` components to reduce duplicated code. Setting the title for each page is done via a `PageTitle` component. This is accessing the layout title state and setting it.
