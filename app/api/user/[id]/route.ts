import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(params:any) {
  
  const email = params.params.id
  
  try {
    const data = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return NextResponse.json({data: data})
  }catch(e){
    if(e instanceof Prisma.PrismaClientKnownRequestError){
      return new NextResponse(e.message, { status: 500 })
    }
    return new NextResponse('Internal Error', { status: 500 })
  }
}