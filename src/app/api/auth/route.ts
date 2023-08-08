import {NextRequest} from 'next/server'
import {PrismaClient} from '@prisma/client'
import {Response} from '@src/controllers/api'
import {encode, verify} from '@src/controllers/auth'



const expireInMinutes = 120
const prisma = new PrismaClient()



export async function POST(req: NextRequest) {
  try {
    const json = await req.json()

    if(json.email && json.password) {
      const user = await prisma.users.findUnique({
        where: {
          email: json.email
        }
      })
      if(user) {
        if(verify(json.password, {email: json.email}, user.password)) {
          const date = new Date()

          date.setTime(
            date.getTime() + (expireInMinutes * 60 * 1000)
          )
          /**
           * Only few user information added to the cookie
           */
          const data = encode(JSON.stringify({
            id: user.id,
            role: user.role,
            email: user.email,
            avatar: user.avatar,
            name: `${user.firstname} ${user.lastname}`
          }))

          return Response(200, {
            data: user,
            message: 'User authenticated successfully.'
          },
          {
            'Set-Cookie': `deziper=${data};httponly;path=/panel`,
            // 'Set-Cookie': `log=${log};expires=${date.toUTCString()};httponly;path=/panel`,
          })
        }
      }
    }
    return Response(400, {
      message: 'Invalid Password/Email Address.'
    })
  }
  catch(e: any) {
    return Response(400, {message: 'Invalid Request'})
  }
}