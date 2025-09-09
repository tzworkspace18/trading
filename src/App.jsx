import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import EntryForm from './components/EntryForm.jsx'
import TransactionsList from './components/TransactionsList.jsx'
import Header from './components/Header.jsx'
import BottomNav from './components/BottomNav.jsx'
import { load } from './data/storage.js'

export default function App() {
  const [version, setVersion] = React.useState(0);
  const refresh = () => setVersion(v => v + 1);

  const state = load();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 pb-28">
        <Routes>
          <Route path="/" element={<Dashboard state={state} onChange={refresh} />} />
          <Route path="/buy" element={<EntryForm type="BUY" onSaved={refresh} />} />
          <Route path="/sell" element={<EntryForm type="SELL" onSaved={refresh} />} />
          <Route path="/history" element={<TransactionsList onChange={refresh} />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
