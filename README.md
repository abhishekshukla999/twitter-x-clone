# X (formerly Twitter) Clone

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Project Links](#project-links)
- [Project Video](#project-video)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Database Design](#database-design)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Contact](#contact)

## Introduction

The Twitter X Clone is a full-featured replica of Twitter that demonstrates my frontend development skills and my ability to work with backend services like Appwrite. The project includes all essential features of Twitter, with real-time updates, user interactions, and customizable themes and colors. While some features like notifications and messaging are not yet implemented, the project serves as a strong showcase of my ability to build complex web applications.

## Features

- **Real-Time Updates:** The home page shows all user posts from latest to oldest and updates in real-time when users post or delete something.
- **Tweet Interactions:** Users can reply, like, repost, bookmark, and download tweets media. The repost feature marks the tweet as reposted without retweeting it.
- **Profile Management:** Users can edit their profiles, follow others, and view their own posts, replies, likes, and media in respective sections.
- **Premium Features:** Users can upgrade to a premium account, enabling features like tweet editing, verified blue tick, and direct media downloads.
- **User & Tweet Search:** The explore page allows searching for tweets and users, while a search bar in the sidebar provides user search functionality.
- **Follow/Unfollow Users:** Users can easily follow or unfollow others directly from their profiles or search results.
- **Bookmarks:** A dedicated page lists all user bookmarks.
- **Settings:** Users can manage their account information, change passwords, and customize themes and colors similar to Twitter.

## Project Links

[Live Project](https://x.abhishekshukla.xyz/)

View the project's original repo here: [Orginial Project Repo Link](https://github.com/abhishekshukla999/twitter-x-clone)

## Project Video

Click the below preview to watch the demo video

[![Video Preview](https://img.youtube.com/vi/ttLXzbxJu5M/0.jpg)](https://www.youtube.com/watch?v=Dv_amrVcgbU)

&nbsp;
Or click here: [Watch](https://www.youtube.com/watch?v=Dv_amrVcgbU)

## Tech Stack

- **Frontend:** React, Tailwind CSS, React Router, Redux Toolkit, React Hook Form
- **Backend:** Appwrite
- **Tools:** Vite, ESLint

## Installation

Follow these steps to set up the project locally:

1. **_Clone the repository:_**

   ```bash
   git clone https://github.com/abhishekshukla999/twitter-x-clone.git
   cd twitter-x-clone
   ```
2. **_Install dependencies:_**

   ```bash
   npm install
   ```
3. **_Set up environment variables:_**

   Create a `.env` file in the root directory and add the necessary environment variables as outlined in the [Environment Variables](#environment-variables) section.
   &nbsp;
4. **_Start the development server:_**

   ```bash
   npm run dev
   ```

## Database Design

The project uses Appwrite for backend services, including user authentication and data storage. Below is an overview of the database collections used in the project:

| Collection Name | Description                                           | Fields                                                       |
| --------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `users`       | Stores user information and preferences.              | `id`, `name`, `username`, `email`, `premium`, etc. |
| `tweets`      | Stores user tweets and related metadata.              | `id`, `user_id`, `content`, `created_at`, etc.       |
| `replies`     | Stores replies to tweets.                             | `id`, `tweet_id`, `user_id`, `reply_content`, etc.   |
| `bookmarks`   | Stores user bookmarks for quick access.               | `id`, `user_id`, `tweet_id`, etc.                      |
| `retweets`    | Stores user retweets.                                 | `id`, `user_id`, `tweet_id`, etc.                      |
| `likes`       | Stores user likes for quick access.                   | `id`, `user_id`, `tweet_id`, etc.                      |
| `follows`     | Stores user followers and following for quick access. | `id`, `user_id`, `following`, `follower`, etc.       |

## Usage

After installation, you can use the following commands to interact with the project:

- **Start the server:**

  ```bash
  npm run dev
  ```
- **Build for production:**

  ```bash
  npm run build
  ```
- **Preview the build:**

  ```bash
  npm run preview
  ```

## Environment Variables

The following environment variables are required for the project:

```bash
# Appwrite
VITE_APPWRITE_URL = ''
VITE_APPWRITE_PROJECT_ID = ''
VITE_APPWRITE_DATABASE_ID = ''

# Collection IDs
VITE_APPWRITE_USERS_COLLECTION_ID = ''
VITE_APPWRITE_TWEETS_COLLECTION_ID = ''
VITE_APPWRITE_BOOKMARKS_COLLECTION_ID = ''
VITE_APPWRITE_LIKES_COLLECTION_ID = ''
VITE_APPWRITE_RETWEETS_COLLECTION_ID = ''
VITE_APPWRITE_REPLIES_COLLECTION_ID = ''
VITE_APPWRITE_FOLLOWS_COLLECTION_ID = ''

# Bucket IDs
VITE_APPWRITE_PROFILE_BUCKET_ID = ''
VITE_APPWRITE_TWEETS_BUCKET_ID = ''

```

## Contributing

Unfortunately, I am not accepting any contributions right now.

## Contact

For any questions or feedback, feel free to contact me:

- **Email:** abhishekworks99@gmail.com
- **LinkedIn:** [Abhishek Shukla](https://www.linkedin.com/in/abhishek-shukla99/)
- **Twitter:** [@abhishekshukl99](https://x.com/abhishekshukl99)

---
