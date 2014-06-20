local json = (loadfile "json")()

MENetwork = {
    mePowerSide = "right",
    controllerAddress = 'http://home.alan-jenkins.com:8080',
    stateAddress = 'http://home.alan-jenkins.com:8080/aestate/json',
    capabilitiesAddress = 'http://home.alan-jenkins.com:8080/caps/json',
    craftingQueueAddress = 'http://home.alan-jenkins.com:8080/crafting/queue',
    craftingQueueClearAddress = 'http://home.alan-jenkins.com:8080/crafting/clear',
    storedItemsUpdateAddress = 'http://home.alan-jenkins.com:8080/stored/update',
    craftingTerm = peripheral.wrap("appeng_me_tilecraftingterminal_0"),
    craftingMon = peripheral.wrap("appeng_me_tilecraftingmonitor_0"),
    MEDrive = peripheral.wrap("me_drive_0"),
    updateInterval = 10,
    updateTimer = ""
}

function MENetwork:power(state)
    if type(state) == "string" then
        if state == 'true' then
            state = true
        else
            state = false
        end
    end
    rs.setOutput(self.mePowerSide, state)
end

function MENetwork:getState(response)
    aeState = json:decode(response)
    net:power(aeState.power)
    http.request(net.stateAddress)
end

function MENetwork:craftingQueue(response)
    craft = json:decode(response)
    if craft then
        for item,amount in pairs(craft) do
            req = {['name'] = item, ['qty'] =  amount}
            net.craftingTerm.requestCrafting(req)
        end
        http.get(self.craftingQueueClearAddress)
    end
    http.request(net.craftingQueueAddress)
end

function MENetwork:

net = MENetwork

http.request(net.stateAddress)

-- report capabilities of components:
caps = {}
caps['craftingTerm'] = net.craftingTerm.getAdvancedMethodsData()
caps['craftingMon'] = net.craftingMon.getAdvancedMethodsData()
caps['MEDrive'] = net.MEDrive.getAdvancedMethodsData()
capsstring = "json=" .. textutils.urlEncode(json:encode_pretty(caps))
http.post(net.capabilitiesAddress, capsstring)
http.request(net.stateAddress)
http.request(net.craftingQueueAddress)
net.updateTimer = os.startTimer(net.updateInterval)
while true do
    local event, param1, param2, param3 = os.pullEvent()

    if event == 'http_success' then
        local response = param2.readAll()
        param2.close()
        if param1 == net.stateAddress then
            net:getState(response)
        elseif param1 == net.craftingQueueAddress then
            net:craftingQueue(response)
        end
    elseif event == "timer" then
        if param1 == net.updateTimer then
            stored_items = 'json=' .. textutils.urlEncode(json:encode_pretty(net.craftingTerm.getAvailableItems()))
            http.post(net.storedItemsUpdateAddress, stored_items)
            net.updateTimer = os.startTimer(net.updateInterval)
        end
    end
end
