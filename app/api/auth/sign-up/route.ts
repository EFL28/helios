import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { session, user } = data;

  console.log("user =>", user);
  console.log("session =>", session);

  //   const hashedPassword = await bcrypt.hash(password, 10);

  return NextResponse.json(
    {
      user,
      session,
    },
    { status: 200 }
  );
}
