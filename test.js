// ('{"notification":{"android":{},"body":"dfdsfdsdsfdsfdsfds","title":"dsfdf"},"sentTime":1668783198312,"data":{},"from":"459787963543","messageId":"0:1668783198323745%794d69e9794d69e9","ttl":2419200,"collapseKey":"com.sociable"}');

const userData = async () => {
  try {
    const data = await fetch('https://reqres.in/api/users');
    const user = await data.json();
    console.log(user.data);
  } catch (error) {
    console.log(error);
  }
};
userData();
