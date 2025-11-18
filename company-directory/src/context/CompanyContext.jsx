import React, { createContext, useContext, useEffect, useState } from 'react';
const CompanyContext = createContext();


export const useCompanies = () => useContext(CompanyContext);


export function CompanyProvider({ children }) {
const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
let mounted = true;
setLoading(true);
fetch('/data/companies.json')
.then((r) => {
if (!r.ok) throw new Error('Failed to fetch companies');
return r.json();
})
.then((data) => {
if (!mounted) return;
setCompanies(data);
setLoading(false);
})
.catch((err) => {
if (!mounted) return;
setError(err.message);
setLoading(false);
});
return () => (mounted = false);
}, []);


return (
<CompanyContext.Provider value={{ companies, setCompanies, loading, error }}>
{children}
</CompanyContext.Provider>
);
}