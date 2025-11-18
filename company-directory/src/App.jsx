// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React from 'react';
import { CompanyProvider } from './context/CompanyContext';
import CompanyList from './components/CompanyList';
import './App.css'


export default function App() {
return (
<CompanyProvider>
<div className="min-h-screen bg-gray-50 p-6 md:p-12">
<div className="max-w-7xl mx-auto">
<header className="mb-6">
<h1 className="text-3xl font-extrabold">Companies Directory</h1>
<p className="mt-1 text-gray-600">Browse companies — filter by industry, location, search, sort, and paginate.</p>
</header>


<main>
<CompanyList />
</main>
</div>
</div>
</CompanyProvider>
);
}
