import React from 'react';
export default function CompanyCard({ company }) {
return (
<div className="bg-white p-4 rounded-lg shadow-sm">
<div className="flex justify-between items-start gap-4">
<div>
<h3 className="text-lg font-semibold">{company.name}</h3>
<p className="text-sm text-gray-600">{company.industry} • {company.location}</p>
</div>
<div className="text-right">
<p className="text-sm text-gray-500">Employees</p>
<p className="font-medium">{company.employees}</p>
</div>
</div>


<div className="mt-3 flex justify-between items-center">
<div className="text-sm text-gray-600">Founded: {company.founded}</div>
<a className="text-sm underline" href={company.website} target="_blank" rel="noreferrer">Website</a>
</div>
</div>
);
}