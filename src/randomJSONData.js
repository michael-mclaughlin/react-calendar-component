/* THIS IS ONLY USED AS A RESOURCE FOR GENERATING RANDOM JSON DATA (ONE OF TREE CHOICES - SEE package.json > scripts) */
module.exports = () => {
    const data = { users: [] };
    // Create 1000 users
    for (let i = 0; i < 1000; i++) {
        data.users.push({ id: i, name: `User Name ${i}`, dept: `department ${i}`, manager: `manager ${i}`, score: `score ${i}` });
    }
    return data
};