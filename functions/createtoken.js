const { requestObj, responseObj } = require('./utils/helper');
const { q, clientQuery } = require('./utils/faunaconnect');

exports.handler = async (event, context) => {
  let data = requestObj(event.body);

  try {
    let avenger = await clientQuery.query(
      q.Let( {                                 
		id:data.id,
		tvn: q.ToNumber(data.tvn),
		account_match: q.Match(q.Index("uniqueid"), q.Var("id")), 
		id_is_new: q.Not(q.Exists(q.Var("account_match"))) }, 

	q.If(q.Var("id_is_new"),
	    q.Do(
	      q.Create(
	        // Store signup token for new account
	        q.Collection("token"),
	        {
	          data: {
	            token: q.NewId(),
	            tun: 0,
	            tvn: q.Subtract(q.Var("tvn"),1),
	            id: q.Var("id"),
	            ta:true,
	          }
	        }
	      ),
	      q.Get(q.Match(q.Index("gettoken"), q.Var("id")))
	    ),
	    q.Do( 
	      q.Update(q.Select(["ref"],q.Get(q.Match(q.Index("uniqueid"), q.Var("id")))),            
	        {
	          data: {
	            token: q.NewId(),
	            tun: 0,
	            tvn: q.Var("tvn"),
	            ta:true,
	          }
	        }
	      ),
	      q.Get(q.Match(q.Index("gettoken"), q.Var("id")))
	    )
    )
)
    );

    return responseObj(200, avenger)
  } catch (error) {
    console.log(error)
    return responseObj(500, error);
  }
 
};





