//获取n位随机数
export default {
 random_char:function(n){
	 var random_charset = [
	 	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
	 	, 'a', 'b', 'c', 'd', 'e', 'f', 'g'
	 	, 'h', 'i', 'j', 'k', 'l', 'm', 'n'
	 	, 'o', 'p', 'q', 'r', 's', 't'
	 	, 'u', 'v', 'w', 'x', 'y', 'z'];
  var res = "";
  for(var i = 0; i < n; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += random_charset[id];
  }
  return res;
 }
}
