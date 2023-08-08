import {NextRequest} from 'next/server'
import {object} from '@src/helpers/common'
import {PrismaPages} from '@src/interface/pages'
import {prisma, getPages} from '@src/controllers/pages'
import {Response, PrismaErrorResponse} from '@src/controllers/api'



export async function GET(req: NextRequest) {
  try {
    const data = await getPages()
    return Response(200, {
      data,
      message: 'Success'
    })
  }
  catch(e: any) {
    console.log(e)
  }
}


export async function PUT(req: NextRequest) {
  const json: PrismaPages = object.filter(await req.json(), ['user'])
  
  try {
    if(json.title) {
      const data = await prisma.pages.update({
        where: {
          id: json.id,
        },
        data: {
          ...json,
          updated: new Date(),
        }
      })
      return Response(200, {
        data,
        message: 'You successfully updated the page.'
      })
    }
    else {
      return Response(400, {message: `You should not leave the title empty.`})
    }
  }
  catch(e: any) {
    return PrismaErrorResponse(e, {
      P2025: {
        status: 404,
        message: `The page with ID '${json.id}' doesn't exist.`
      }
    })
  }
}


export async function POST(req: NextRequest) {
  const json: PrismaPages = object.filter(await req.json(), ['user'])
  
  try {
    if(json.title) {
      const data = await prisma.pages.create({data: json})
      return Response(201, {
        data,
        message: 'New page created successfully.'
      })
    }
    else {
      return Response(400, {message: 'Missing required field `title`.'})
    }
  }
  catch(e: any) {
    return PrismaErrorResponse(e, {
      P2002: {
        status: 409,
        message: `Page title "${json.title}" is already exist.`
      }
    })
  }
}



export async function DELETE(req: NextRequest) {
  try {
    const {searchParams}: any = new URL(req.url)

    if(searchParams) {
      const ids = searchParams.get('ids')
      if(ids) {
        const data = await prisma.pages.deleteMany({
          where: {
            id: {
              in: ids.split(',').map((v: string) => Number(v))
            }
          }
        })
        if(data.count > 0) {
          return Response(200, {message: 'Successfully deleted record.'})
        }
      }
      return Response(400, {
        message: `Missing required field "ids".`
      })
    }
  }
  catch(e: any) {
    return PrismaErrorResponse(e, {
      P2003: {
        status: 403,
        message: `Can't delete a page with posts using it.`
      }
    })
  }
}