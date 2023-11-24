import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(params:any) {
  
  const id = params.params.id
  
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: id
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

export async function PUT(params:any){
  const id = params.params.id
  try{
    const data = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        published: true
      }
    })
    await prisma.$disconnect();
    return NextResponse.json({data: data})
  }catch(e){
    if(e instanceof Prisma.PrismaClientKnownRequestError){
      return new NextResponse(e.message, { status: 400 })
    }
    await prisma.$disconnect();
    return new NextResponse('Internal Error', { status: 400 })
  }
}

export async function DELETE({ params }: { params: { id: string }}){
  const id = params.id
  try{
    const data = await prisma.post.delete({
      where: {
        id: Number(id)
      }
    })
    await prisma.$disconnect();
    return NextResponse.json({data: data})
  }catch(e){
    if(e instanceof Prisma.PrismaClientKnownRequestError){
      return new NextResponse(e.message, { status: 400 })
    }
    await prisma.$disconnect();
    return new NextResponse('Internal Error', { status: 400 })
  }
} 