import { NextResponse } from 'next/server'
import prisma from "@/lib/prisma"
import { Prisma } from '@prisma/client'
import { cookies } from 'next/headers'

export async function GET() {

  try{
    const result = await prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })
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

export async function POST(request:Request){
  const {title, content} = await request.json()

  const session = cookies().get('email_address')
  if(session){
    
    try{
      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          author: { 
            connect: {
              email: JSON.parse(JSON.stringify(session.value))
            }
          }
        }
      })
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
  }else{
    await prisma.$disconnect()
    return new NextResponse('Unauthorized', { status: 401 });
  }
}