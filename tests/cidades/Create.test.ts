import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"



describe("Cidades-Create", () =>{

    it("Criar um registro", async() =>{

    const res1 = await testServer.post("/Cidades").send({
            nome: "Caxias do Sul"
        })
            
        expect(res1.statusCode).toEqual(StatusCodes.CREATED)
        expect(typeof res1.body).toEqual("number")

    })

    it("Tenta criar um registro com nome curto", async() =>{

        const res1 = await testServer.post("/Cidades").send({
                nome: "Sp"
            })
                
            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST)
            expect(res1.body).toHaveProperty("errors.body.nome")
    
        })

})