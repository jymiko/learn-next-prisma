import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"
import { Prisma } from '@prisma/client'
import { cookies } from 'next/headers'

export async function POST(request:Request) {
  const { email, name } = await request.json()
  
  try{
    const result = await prisma.user.create({
      data: {
        email: email,
        name: name
      }
    })
    cookies().set('email_address', result.email)
    await prisma.$disconnect()
    return NextResponse.json({data: result})
  }catch(e){
    await prisma.$disconnect()
    if(e instanceof Prisma.PrismaClientKnownRequestError){
      if (e.code === 'P2002') {
        console.log(e.message)
        return new NextResponse(e.message, { status: 400 })
      }
    }
    return new NextResponse('Internal Error', { status: 400 })
  }
}