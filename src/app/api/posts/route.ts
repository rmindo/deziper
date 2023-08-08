import {NextRequest} from 'next/server'
import {object} from '@src/helpers/common'
import {PrismaPosts} from '@src/interface/posts'
import {prisma, getPosts} from '@src/controllers/posts'
import {Response, PrismaErrorResponse} from '@src/controllers/api'



export async function GET(req: NextRequest) {
  try {
    const data = await getPosts()
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
  const json: PrismaPosts = object.filter(await req.json(), ['user'])

  try {
    if(json.title) {
      const data = await prisma.posts.update({
        where: {
          id: json.id,
        },
        data: {
          ...json,
          updated: new Date(),
          tags: JSON.stringify(json.tags),
          categories: JSON.stringify(json.categories),
        }
      })
      data.tags = JSON.parse(data.tags)
      data.categories = JSON.parse(data.categories)
  
      return Response(200, {
        data,
        message: 'You successfully updated the post.'
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
        message: `The post with ID '${json.id}' doesn't exist.`
      }
    })
  }
}


export async function POST(req: NextRequest) {
  const required = [
    'title',
    'status',
    'parent',
    'categories'
  ]
  try {
    const post: PrismaPosts = object.filter(await req.json(), ['user'])

    if(object.has(required, post)) {
      const data = await prisma.posts.create({
        data: {
          ...post,
          tags: JSON.stringify(post.tags),
          categories: JSON.stringify(post.categories),
        }
      })
      data.tags = JSON.parse(data.tags)
      data.categories = JSON.parse(data.categories)

      return Response(201, {
        data,
        message: 'New post created successfully.'
      })
    }
    else {
      return Response(400, {
        message: `Missing required fields ${required.join(', ')}.`
      })
    }
  }
  catch(e: any) {
    return PrismaErrorResponse(e, {
      P2002: {
        status: 409,
        message: 'Post title is already exist.'
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
        const data = await prisma.posts.deleteMany({
          where: {
            id: {
              in: ids.split(',').map((v: string) => Number(v))
            }
          }
        })
        if(data.count > 0) {
          return Response(200, {message: 'Success'})
        }
      }
      return Response(400, {
        message: `Missing required field "ids".`
      })
    }
  }
  catch(e: any) {
    console.log(e)
  }
}