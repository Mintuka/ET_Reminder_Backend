const admin = require('firebase-admin');

export async function getStatistics (companyId:string) {
    let messages:any = [];
    let totalMessages:number = 0;
    let dataCountByMonth: Map<string, { count: number; order: number }> = new Map();
    
    await admin.firestore().collection("ET_Reminders/" + companyId + "/Messages")
    .orderBy("time","desc")
    .get()
    .then((response:any) => {
        totalMessages = response.docs.length

        response.docs.forEach((doc:any, index:number) => {
                  
            const data = doc.data();
            const creationDate = data.time.toDate();
            
            const date = creationDate.toString().split(' '); 
            const month = date[1]
            const year = creationDate.getFullYear();
            
            const key = `${month}-${year}`;
            
            if (dataCountByMonth.has(key)) {
              const monthData = dataCountByMonth.get(key)!;
              monthData.count++;
            } else {
              dataCountByMonth.set(key, { count: 1, order: index + 1 });
            }
        
          })

          dataCountByMonth.forEach((monthData, monthYear) => {

            const monthlyData = { id:monthData.order, amount:monthData.count, month:monthYear }
            messages.push(monthlyData)

          });

          messages.sort((a:any, b:any) => a.id > b.id);
    });

    return { messages, totalMessages }
}