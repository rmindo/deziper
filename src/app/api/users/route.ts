import {sign} from '@src/controllers/auth'
import {NextRequest} from 'next/server'
import {PrismaClient} from '@prisma/client'
import {Response, ConflictResponse} from '@src/controllers/api'


const {users} = new PrismaClient()


export async function GET(req: NextRequest) {
  try {
    const id = Number(
      req.nextUrl.searchParams.get('id')
    )
    const data = await users.findUnique({
      where: {id},
      select: {
        id: true,
        role: true,
        email: true,
        avatar: true,
        lastname: true,
        firstname: true,
      }
    })
    /**
     * Exclude password
     */
    if(data) {
      return Response(200, {data})
    }
    return Response(404)
  }
  catch(e) {
    return Response(400)
  }
}


export async function POST(req: NextRequest) {
  try {
    const json = await req.json()

    if(json.confirm === json.password) {
      delete json.confirm
      /**
       * The password is unique tied to email address.
       * If user happened to have the same password it will create unique hash because of the email payload.
       */
      const data = await users.create({
        data: {
          role: 'User',
          ...json,
          password: sign(json.password, {email: json.email})
        }
      })
      return Response(201, {
        data: data,
        message: 'New user created successfully'
      })
    }
    return Response(400, {
      message: 'Password not matched!'
    })
  }
  catch(e: any) {
    return ConflictResponse(e, 'Email address is already exist')
  }
}