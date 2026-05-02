import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  await fetch("http://20.207.122.201/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuczE4NDBAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzcwNzU5NSwiaWF0IjoxNzc3NzA2Njk1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2FjNjZmYjgtZGZiZS00ZTZmLTkyNTktYjQwYTg5NDQzYzI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml2ZXRoaXRoYSBzaXZhcmFqIiwic3ViIjoiMTcxODNmODMtMjdkMy00YWNiLTkzYzgtNjkzMWE1ZDk4MmJiIn0sImVtYWlsIjoibnMxODQwQHNybWlzdC5lZHUuaW4iLCJuYW1lIjoibml2ZXRoaXRoYSBzaXZhcmFqIiwicm9sbE5vIjoicmEyMzExMDI2MDUwMDgzIiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiMTcxODNmODMtMjdkMy00YWNiLTkzYzgtNjkzMWE1ZDk4MmJiIiwiY2xpZW50U2VjcmV0IjoiWXFwcGpqdFNOWER6dXJjbiJ9.Vi7-tz0wLTTx3yI_Jj-lhB9nEHxMxvL5-jgw-GmbIUI",
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json({ success: true });
}