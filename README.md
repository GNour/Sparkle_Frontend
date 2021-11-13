<p align="center"><a href="https://sparkletms.vercel.app/" target="_blank"><img src="https://github.com/GNour/Sparkle_Server/blob/main/documentations/Sparkle_Logo.png?raw=true" width="200"></a></p>

## About Sparkle Nextjs

Sparkle Nextjs serves as the frontend repo of Sparkle Team Management System.

## Getting Started

First, clone repo or download the .zip file:
- run ``npm install``

To start the development server:
```bash
npm run dev
```

To build and run:
```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Contact me** to send you the correct declarations in the **.env.local** file and the public API keys.
Any help needed, feel free to open an issue or email me directly [ghyathnour@gmail.com](mailto:ghyathnour@gmail.com).

## Repo Tree
**Find the components, helpers, stores, etc...**
```bash
├── components
│   ├── ChatPage
│   │   ├── ChatMessage.js
│   │   ├── Chat.module.scss
│   │   └── ChatUserCard.js
│   ├── Common
│   │   ├── BackButton.js
│   │   ├── Buttons
│   │   │   ├── ActionButtonWithIcon.js
│   │   │   ├── Buttons.module.scss
│   │   │   └── SquareButton.js
│   │   ├── Cards
│   │   │   ├── NoteCard.js
│   │   │   └── NoteCard.module.scss
│   │   ├── ChartContainer.js
│   │   ├── ColoumnContainer.js
│   │   ├── Common.module.scss
│   │   ├── CoursesContentPreview.js
│   │   ├── CustomModal.js
│   │   ├── IconButton.js
│   │   ├── IconText.js
│   │   ├── Images
│   │   │   └── RoundedImageWithText
│   │   │       ├── RoundedImageWithText.js
│   │   │       └── RoundedImageWithText.module.scss
│   │   ├── InfoActionsFooter.js
│   │   ├── InfoBody.js
│   │   ├── Infolist.js
│   │   ├── InfoText.js
│   │   ├── Inputs
│   │   │   ├── Inputs.module.scss
│   │   │   ├── SelectInput.js
│   │   │   ├── TextAreaInput.js
│   │   │   └── TextInput.js
│   │   ├── Navs
│   │   │   ├── HeaderNavItem.js
│   │   │   ├── HeaderNav.js
│   │   │   └── Nav.module.scss
│   │   ├── PageHeader.js
│   │   ├── PageHeaderWithActions.js
│   │   ├── ScrollableContainer.js
│   │   ├── SearchBar.js
│   │   ├── SideBar
│   │   │   ├── SideBarActionButton.js
│   │   │   ├── SideBar.js
│   │   │   └── SideBar.module.scss
│   │   └── TitleDescription.js
│   ├── CoursesPage
│   │   ├── ContentCard.js
│   │   ├── ContentCard.module.scss
│   │   └── Quiz
│   │       ├── QuizContainer.js
│   │       ├── QuizMCQ.js
│   │       ├── Quiz.module.scss
│   │       └── QuizStartPage.js
│   ├── EmployeesPage
│   │   └── UserCard
│   │       ├── UserCard.js
│   │       └── UserCard.module.scss
│   ├── Layouts
│   │   ├── ChatLayout.js
│   │   ├── Employees
│   │   │   ├── AllEmployeeLayout.module.scss
│   │   │   ├── AllEmployeesLayout.js
│   │   │   └── EmployeeLayout.js
│   │   ├── MainLayout.js
│   │   ├── MainLayout.module.scss
│   │   └── TasksLayout
│   │       ├── CourseLayout.js
│   │       └── TasksLayout.js
│   └── TasksPage
│       └── TaskCard
│           ├── TaskCard.js
│           └── TaskCard.module.scss
├── helpers
│   ├── axiosConfig.js
│   ├── CourseHelper.js
│   ├── FormHelpers.js
│   ├── ModalHelper.js
│   └── UserStatsHelpers.js
├── next.config.js
├── package.json
├── package-lock.json
├── pages
│   ├── _app.js
│   ├── chat.js
│   ├── courses
│   │   ├── [courseId].js
│   │   └── index.js
│   ├── employees
│   │   ├── attendance.js
│   │   ├── create.js
│   │   ├── Employees.module.scss
│   │   ├── index.js
│   │   └── [userId].js
│   ├── index.js
│   ├── login.js
│   ├── tasks
│   │   └── index.js
│   └── teams
│       └── index.js
├── public
│   ├── favicon.ico
│   ├── id_img.png
│   ├── logoBig.png
│   ├── logoSmall.png
│   └── vercel.svg
├── README.md
├── stores
│   └── AuthContext.js
└── styles
    ├── _animations.scss
    ├── _base.scss
    ├── globals.scss
    ├── _mixins.scss
    ├── _overrides.scss
    ├── _utilities.scss
    └── _variables.scss

```

**Don't hesitate to contact me for follow-ups on components props, functions, etc...**
