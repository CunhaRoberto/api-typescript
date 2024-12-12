import { StatusCodes } from "http-status-codes"
import { testServer} from "../jest.setup"



describe("Cidades-GetById", () =>{

    it("Pesquisa um registro por Id", async() =>{

        const resCreate1 = await testServer.post("/Cidades").send({
            nome: "Novo Horizonte"
        })
            
        expect(resCreate1.statusCode).toEqual(StatusCodes.CREATED)

    const resGetById = await testServer
    .get(`/Cidades/${resCreate1.body}`)
    .send()            
        expect(resGetById.statusCode).toEqual(StatusCodes.OK)
      

    })

    it("Tenta pesquisar um registro que não existe", async() =>{

        const res1 = await testServer
        .get("/Cidades/1001")
        .send()
                
        expect(res1.statusCode).toEqual(StatusCodes.NOT_FOUND)
        expect(res1.body).toHaveProperty("errors.default")
    
    })
              
        

})