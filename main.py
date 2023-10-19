# Project Acta Mea by Alex Arbuckle #


# import <
from github import Github
from discord import Intents
from discord.utils import get
from discord.ext import commands
from lxRbckl import githubGet, githubSet, requestsGet

# >


# global <
githubToken = ''
discordToken = ''

gFile = 'data.json'
gGithub = Github(githubToken)
gAdminId = 0
gRepository = 'lxRbckl/Project-Acta-Mea-4'
actaMea = commands.Bot(command_prefix = '', intents = Intents.all())
gSettingLink = 'https://github.com/lxRbckl/Project-Acta-Mea-4/raw/main/setting.json'
gNode = {

    "ssh" : "",
    "type" : "",
    "description" : "",
    "service" : []

}

# >


@actaMea.event
async def on_member_join(member):
    '''  '''

    # if (qualifying admin) <
    if (member.id == gAdminId):

        role = get(member.guild.roles, name = 'Admin')
        await member.add_roles(role)

    # >


async def setFunction(

        ctx,
        pKey: str = None,
        pNode: str = None,
        pData: dict = None,
        pValue: str = None

):
    '''  '''

    # if (pKey not service) <
    # elif (new node) <
    # elif (pKey service) <
    if ((pKey) and (pKey != 'service')): pData[pNode][pKey] = pValue; return True
    elif ((pNode not in pData.keys()) and (not pKey)): pData[pNode] = gNode; return True
    elif ((pKey == 'service') and (pValue)): pData[pNode]['service'].append(pValue); return True

    # >


async def getFunction(

        ctx,
        pKey: str = None,
        pNode: str = None,
        pData: dict = None,
        **kwargs

):
    '''  '''

    # if (pKey not service) <
    # elif (pKey service) <
    # elif (node) <
    # elif (all nodes) <
    if ((pKey) and (pKey != 'service')): content = pData[pNode][pKey]
    elif (pKey == 'service'): content = '\n'.join(pData[pNode][pKey])
    elif ((pNode) and (not pKey)): content = '\n'.join(pData[pNode].keys())
    elif ((not pKey) and (not pNode)): content = '\n'.join(sorted(pData.keys()))

    # >

    # send <
    await ctx.channel.send(

        delete_after = 60,
        content = f'`{content}`'

    ) if (content) else None

    # >

    return False

async def delFunction(

        ctx,
        pKey: str = None,
        pNode: str = None,
        pData: dict = None,
        pValue: str = None

):
    '''  '''

    # if (pKey not service) <
    # elif (pKey service) <
    # elif (node) <
    if (pKey not in ['service', 'y']): del pData[pNode][pKey]; print('1'); return True
    elif (pKey == 'service'): pData[pNode]['service'].remove(pValue); print('2'); return True
    elif ((pNode in pData.keys()) and (pKey == 'y')): del pData[pNode]; print('3'); return True

    # >


@commands.has_permissions(administrator = True)
@actaMea.command(aliases = requestsGet(pLink = gSettingLink)['aliases'])
async def functionCommand(

        ctx,
        pNode: str = None,
        pKey: str = None,
        pValue: str = None

):
    '''  '''

    # set (data) <
    # get (bData) <
    data = githubGet(

        pGithub = gGithub,
        pFile = 'data.json',
        pRepository = gRepository

    )
    bData = await {

        'set' : setFunction,
        'get' : getFunction,
        'del' : delFunction

    }[ctx.invoked_with.lower()](

        ctx = ctx,
        pKey = pKey,
        pData = data,
        pNode = pNode,
        pValue = pValue

    )

    # >

    # if (update) <
    if (bData):

        githubSet(

            pData = data,
            pFile = gFile,
            pGithub = gGithub,
            pRepository = gRepository

        )

    # >


# main <
if (__name__ == '__main__'): actaMea.run(discordToken)

# >
