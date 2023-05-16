
/**
 * 生成FormData对象
 * @param params FormData中的键值对
 * @param boundary 似乎是content-type里面的boundary参数，可以用“----SASTSHOP${new Date().getTime()}”生成一个
 * @returns 一个FormData对象
 */
export function createFormData(params = {}, boundary = '') {
    let result = '';
    for (let i in params) {
        result += `\r\n--${boundary}`;
        result += `\r\nContent-Disposition: form-data; name="${i}"`;
        result += '\r\n';
        result += `\r\n${params[i]}`
    }
    // 如果obj不为空，则最后一行加上boundary
    if (result) {
        result += `\r\n--${boundary}`
    }
    return result
}